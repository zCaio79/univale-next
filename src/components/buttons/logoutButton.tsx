
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from "@/context/AuthContext";
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const supabase = createClientComponentClient()
  const user = useAuth()
  
  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.setUser(null)
    window.location.href = '/login'
  }

  return (
    <button type='button' onClick={handleLogout} className="font-semibold flex items-center gap-2 text-xs py-1.5 px-4 rounded-md text-zinc-50 
    shadow-md cursor-pointer bg-red-500 hover:bg-red-600 md:text-sm">
      <LogOut className='size-4'/>
      <span className='hidden md:flex'>{user.user?.email?.split("@")[0]}</span>
      <span className='flex md:hidden'>Sair</span>
    </button>
  )
}
