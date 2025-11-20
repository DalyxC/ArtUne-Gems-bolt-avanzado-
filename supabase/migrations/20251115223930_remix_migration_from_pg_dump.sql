--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'artist',
    'client',
    'admin'
);


--
-- Name: manual_request_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.manual_request_type AS ENUM (
    'recurrent',
    'fixed'
);


--
-- Name: handle_new_oauth_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_oauth_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Check if user_role already exists (from manual signup)
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.id) THEN
    -- Default to client role for OAuth signups
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'client')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;


--
-- Name: handle_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_conversation_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_conversation_timestamp() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: artist_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.artist_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    stage_name text,
    genre text,
    performance_type text,
    experience_years integer,
    hourly_rate numeric(10,2),
    availability text,
    portfolio_url text,
    verification_status text DEFAULT 'pending'::text,
    profile_completion integer DEFAULT 0,
    setup_step_completed integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    artist_id uuid NOT NULL,
    request_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: manual_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manual_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    client_id uuid NOT NULL,
    artist_id uuid NOT NULL,
    request_type public.manual_request_type NOT NULL,
    message text,
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT manual_requests_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text, 'completed'::text, 'in_progress'::text])))
);


--
-- Name: message_flags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.message_flags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message_id uuid,
    user_id uuid NOT NULL,
    violation_type text NOT NULL,
    flagged_content text NOT NULL,
    ai_confidence numeric(3,2),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    content text NOT NULL,
    is_flagged boolean DEFAULT false,
    is_blocked boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    read_at timestamp with time zone,
    attachment_url text,
    attachment_type text
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    phone text,
    bio text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    onboarding_completed boolean DEFAULT false,
    is_recurrent_available boolean DEFAULT false,
    accepted_recurrent_terms boolean DEFAULT false,
    is_fixed_contract_available boolean DEFAULT false,
    accepted_fixed_terms boolean DEFAULT false,
    terms_acceptance_timestamp timestamp with time zone
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_strikes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_strikes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    strike_count integer DEFAULT 0,
    last_strike_at timestamp with time zone,
    is_suspended boolean DEFAULT false,
    suspension_until timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: artist_profiles artist_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artist_profiles
    ADD CONSTRAINT artist_profiles_pkey PRIMARY KEY (id);


--
-- Name: artist_profiles artist_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artist_profiles
    ADD CONSTRAINT artist_profiles_user_id_key UNIQUE (user_id);


--
-- Name: conversations conversations_client_id_artist_id_request_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_client_id_artist_id_request_id_key UNIQUE (client_id, artist_id, request_id);


--
-- Name: conversations conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (id);


--
-- Name: manual_requests manual_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manual_requests
    ADD CONSTRAINT manual_requests_pkey PRIMARY KEY (id);


--
-- Name: message_flags message_flags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message_flags
    ADD CONSTRAINT message_flags_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: user_strikes user_strikes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_strikes
    ADD CONSTRAINT user_strikes_pkey PRIMARY KEY (id);


--
-- Name: user_strikes user_strikes_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_strikes
    ADD CONSTRAINT user_strikes_user_id_key UNIQUE (user_id);


--
-- Name: idx_conversations_artist; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversations_artist ON public.conversations USING btree (artist_id);


--
-- Name: idx_conversations_client; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversations_client ON public.conversations USING btree (client_id);


--
-- Name: idx_conversations_request; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_conversations_request ON public.conversations USING btree (request_id);


--
-- Name: idx_manual_requests_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_manual_requests_created_at ON public.manual_requests USING btree (created_at DESC);


--
-- Name: idx_manual_requests_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_manual_requests_status ON public.manual_requests USING btree (status);


--
-- Name: idx_message_flags_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_message_flags_user ON public.message_flags USING btree (user_id);


--
-- Name: idx_messages_conversation; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_messages_conversation ON public.messages USING btree (conversation_id);


--
-- Name: idx_messages_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_messages_created ON public.messages USING btree (created_at DESC);


--
-- Name: idx_messages_sender; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_messages_sender ON public.messages USING btree (sender_id);


--
-- Name: idx_profiles_onboarding; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_profiles_onboarding ON public.profiles USING btree (id, onboarding_completed);


--
-- Name: idx_user_strikes_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_strikes_user ON public.user_strikes USING btree (user_id);


--
-- Name: messages messages_update_conversation; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER messages_update_conversation AFTER INSERT ON public.messages FOR EACH ROW EXECUTE FUNCTION public.update_conversation_timestamp();


--
-- Name: artist_profiles set_updated_at_artist_profiles; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_updated_at_artist_profiles BEFORE UPDATE ON public.artist_profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: profiles set_updated_at_profiles; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: manual_requests update_manual_requests_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_manual_requests_updated_at BEFORE UPDATE ON public.manual_requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- Name: artist_profiles artist_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artist_profiles
    ADD CONSTRAINT artist_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: conversations conversations_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: conversations conversations_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: conversations conversations_request_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_request_id_fkey FOREIGN KEY (request_id) REFERENCES public.manual_requests(id) ON DELETE CASCADE;


--
-- Name: manual_requests manual_requests_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manual_requests
    ADD CONSTRAINT manual_requests_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: manual_requests manual_requests_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manual_requests
    ADD CONSTRAINT manual_requests_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: message_flags message_flags_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message_flags
    ADD CONSTRAINT message_flags_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: message_flags message_flags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.message_flags
    ADD CONSTRAINT message_flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: messages messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_strikes user_strikes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_strikes
    ADD CONSTRAINT user_strikes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: manual_requests Admins can view all manual requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all manual requests" ON public.manual_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: message_flags Admins can view all message flags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all message flags" ON public.message_flags FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_strikes Admins can view all strikes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all strikes" ON public.user_strikes FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: artist_profiles Artists can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Artists can insert their own profile" ON public.artist_profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: artist_profiles Artists can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Artists can update their own profile" ON public.artist_profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: manual_requests Artists can view requests to them; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Artists can view requests to them" ON public.manual_requests FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = manual_requests.artist_id) AND (profiles.id = auth.uid())))));


--
-- Name: artist_profiles Artists can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Artists can view their own profile" ON public.artist_profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: manual_requests Clients can view their own requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Clients can view their own requests" ON public.manual_requests FOR SELECT TO authenticated USING ((auth.uid() = client_id));


--
-- Name: artist_profiles Everyone can view verified artist profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Everyone can view verified artist profiles" ON public.artist_profiles FOR SELECT USING ((verification_status = 'verified'::text));


--
-- Name: user_roles Only admins can manage roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Only admins can manage roles" ON public.user_roles USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: message_flags System can insert message flags; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "System can insert message flags" ON public.message_flags FOR INSERT WITH CHECK (true);


--
-- Name: user_strikes System can manage strikes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "System can manage strikes" ON public.user_strikes USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: conversations Users can create conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (((auth.uid() = client_id) OR (auth.uid() = artist_id)));


--
-- Name: manual_requests Users can create manual requests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create manual requests" ON public.manual_requests FOR INSERT TO authenticated WITH CHECK ((auth.uid() = client_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- Name: messages Users can send messages in their conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can send messages in their conversations" ON public.messages FOR INSERT WITH CHECK (((EXISTS ( SELECT 1
   FROM public.conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.client_id = auth.uid()) OR (conversations.artist_id = auth.uid()))))) AND (sender_id = auth.uid())));


--
-- Name: messages Users can update their own messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own messages" ON public.messages FOR UPDATE USING ((sender_id = auth.uid()));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: messages Users can view messages in their conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.conversations
  WHERE ((conversations.id = messages.conversation_id) AND ((conversations.client_id = auth.uid()) OR (conversations.artist_id = auth.uid()))))));


--
-- Name: conversations Users can view their own conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own conversations" ON public.conversations FOR SELECT USING (((auth.uid() = client_id) OR (auth.uid() = artist_id)));


--
-- Name: profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_strikes Users can view their own strikes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own strikes" ON public.user_strikes FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: artist_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: conversations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

--
-- Name: manual_requests; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.manual_requests ENABLE ROW LEVEL SECURITY;

--
-- Name: message_flags; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.message_flags ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_strikes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_strikes ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


