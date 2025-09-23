
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwbjzrznehbqytwhshxs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Ymp6cnpuZWhicXl0d2hzaHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3MDI0NDAsImV4cCI6MTk5MTI3ODQ0MH0.NRqVC2gAVNco64Woi3Ax-sqJdk_BWADRDqwCeCtmiso'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;