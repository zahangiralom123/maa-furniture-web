import AdminPanel from '@/components/AdminPanel';
import AuthAdminPage from '@/components/AuthAdminPage';
import { isAdminAuthenticated } from '@/lib/auth-helper';
import { Metadata } from 'next';
export  const metadata : Metadata = {
    title : "Admin Panel",
    robots : {
        follow : false,
        index : false,
    }
}
const AdminPage = async () => {
    const authenticated = await isAdminAuthenticated();
    if(!authenticated) 
    {
        return <AuthAdminPage/>
    }
  return (
    <AdminPanel/>
  )
}

export default AdminPage