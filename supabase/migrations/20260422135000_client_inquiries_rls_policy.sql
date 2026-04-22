-- Add RLS policy to allow anonymous users to submit contact inquiries
-- This is required because the contact form uses the anon key and
-- client_inquiries has RLS enabled without an INSERT policy for anon users.

CREATE POLICY "Anyone can submit a client inquiry"
ON public.client_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admin) can read inquiries
CREATE POLICY "Authenticated users can view client inquiries"
ON public.client_inquiries
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users (admin) can update inquiries
CREATE POLICY "Authenticated users can update client inquiries"
ON public.client_inquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
