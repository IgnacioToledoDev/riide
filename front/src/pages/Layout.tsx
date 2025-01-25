import { Outlet } from 'react-router-dom'
import { Header } from '@/features/_global/components/Header';

function Layout() {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    )
  }

  export default Layout;