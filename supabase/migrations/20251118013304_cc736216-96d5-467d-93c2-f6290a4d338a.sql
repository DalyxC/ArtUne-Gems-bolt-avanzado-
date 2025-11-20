-- Drop the overly restrictive "Only admins can manage roles" policy
DROP POLICY IF EXISTS "Only admins can manage roles" ON user_roles;

-- Create more granular policies for user_roles
-- Allow users to insert their own role during signup
CREATE POLICY "Users can insert their own role during signup"
  ON user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only admins can update roles
CREATE POLICY "Only admins can update roles"
  ON user_roles FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete roles
CREATE POLICY "Only admins can delete roles"
  ON user_roles FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));