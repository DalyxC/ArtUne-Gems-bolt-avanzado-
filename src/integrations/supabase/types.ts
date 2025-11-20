export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artist_media: {
        Row: {
          artist_id: string
          created_at: string | null
          display_order: number | null
          file_path: string
          file_type: string
          file_url: string
          id: string
          updated_at: string | null
        }
        Insert: {
          artist_id: string
          created_at?: string | null
          display_order?: number | null
          file_path: string
          file_type: string
          file_url: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          artist_id?: string
          created_at?: string | null
          display_order?: number | null
          file_path?: string
          file_type?: string
          file_url?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artist_media_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_profiles: {
        Row: {
          accepts_fixed_contract: boolean | null
          accepts_one_time: boolean | null
          accepts_recurring: boolean | null
          availability: string | null
          created_at: string
          experience_years: number | null
          genre: string | null
          hourly_rate: number | null
          id: string
          location_city: string | null
          location_country: string | null
          location_lat: number | null
          location_lng: number | null
          performance_type: string | null
          portfolio_url: string | null
          primary_category: string | null
          profile_completion: number | null
          setup_step_completed: number | null
          stage_name: string | null
          stripe_account_id: string | null
          stripe_onboarding_complete: boolean | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          accepts_fixed_contract?: boolean | null
          accepts_one_time?: boolean | null
          accepts_recurring?: boolean | null
          availability?: string | null
          created_at?: string
          experience_years?: number | null
          genre?: string | null
          hourly_rate?: number | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          location_lat?: number | null
          location_lng?: number | null
          performance_type?: string | null
          portfolio_url?: string | null
          primary_category?: string | null
          profile_completion?: number | null
          setup_step_completed?: number | null
          stage_name?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_complete?: boolean | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          accepts_fixed_contract?: boolean | null
          accepts_one_time?: boolean | null
          accepts_recurring?: boolean | null
          availability?: string | null
          created_at?: string
          experience_years?: number | null
          genre?: string | null
          hourly_rate?: number | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          location_lat?: number | null
          location_lng?: number | null
          performance_type?: string | null
          portfolio_url?: string | null
          primary_category?: string | null
          profile_completion?: number | null
          setup_step_completed?: number | null
          stage_name?: string | null
          stripe_account_id?: string | null
          stripe_onboarding_complete?: boolean | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          artist_id: string
          client_id: string
          created_at: string
          id: string
          request_id: string | null
          updated_at: string
        }
        Insert: {
          artist_id: string
          client_id: string
          created_at?: string
          id?: string
          request_id?: string | null
          updated_at?: string
        }
        Update: {
          artist_id?: string
          client_id?: string
          created_at?: string
          id?: string
          request_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "manual_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      manual_requests: {
        Row: {
          artist_id: string
          client_id: string
          created_at: string | null
          id: string
          message: string | null
          request_type: Database["public"]["Enums"]["manual_request_type"]
          status: string | null
          updated_at: string | null
        }
        Insert: {
          artist_id: string
          client_id: string
          created_at?: string | null
          id?: string
          message?: string | null
          request_type: Database["public"]["Enums"]["manual_request_type"]
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          artist_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          message?: string | null
          request_type?: Database["public"]["Enums"]["manual_request_type"]
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "manual_requests_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_flags: {
        Row: {
          ai_confidence: number | null
          created_at: string
          flagged_content: string
          id: string
          message_id: string | null
          user_id: string
          violation_type: string
        }
        Insert: {
          ai_confidence?: number | null
          created_at?: string
          flagged_content: string
          id?: string
          message_id?: string | null
          user_id: string
          violation_type: string
        }
        Update: {
          ai_confidence?: number | null
          created_at?: string
          flagged_content?: string
          id?: string
          message_id?: string | null
          user_id?: string
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_flags_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachment_type: string | null
          attachment_url: string | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_blocked: boolean | null
          is_flagged: boolean | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          attachment_type?: string | null
          attachment_url?: string | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_blocked?: boolean | null
          is_flagged?: boolean | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          attachment_type?: string | null
          attachment_url?: string | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_blocked?: boolean | null
          is_flagged?: boolean | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accepted_fixed_terms: boolean | null
          accepted_recurrent_terms: boolean | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_fixed_contract_available: boolean | null
          is_recurrent_available: boolean | null
          onboarding_completed: boolean | null
          phone: string | null
          terms_acceptance_timestamp: string | null
          updated_at: string
        }
        Insert: {
          accepted_fixed_terms?: boolean | null
          accepted_recurrent_terms?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_fixed_contract_available?: boolean | null
          is_recurrent_available?: boolean | null
          onboarding_completed?: boolean | null
          phone?: string | null
          terms_acceptance_timestamp?: string | null
          updated_at?: string
        }
        Update: {
          accepted_fixed_terms?: boolean | null
          accepted_recurrent_terms?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_fixed_contract_available?: boolean | null
          is_recurrent_available?: boolean | null
          onboarding_completed?: boolean | null
          phone?: string | null
          terms_acceptance_timestamp?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_strikes: {
        Row: {
          created_at: string
          id: string
          is_suspended: boolean | null
          last_strike_at: string | null
          strike_count: number | null
          suspension_until: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_suspended?: boolean | null
          last_strike_at?: string | null
          strike_count?: number | null
          suspension_until?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_suspended?: boolean | null
          last_strike_at?: string | null
          strike_count?: number | null
          suspension_until?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_strikes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "artist" | "client" | "admin"
      manual_request_type: "recurrent" | "fixed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["artist", "client", "admin"],
      manual_request_type: ["recurrent", "fixed"],
    },
  },
} as const
