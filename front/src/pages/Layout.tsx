import { Outlet, useMatches } from 'react-router-dom'
import { Header } from '@/features/_global/components/Header';

interface RouteHandle {
  hideHeader?: boolean;
}

function Layout() {
  const matches = useMatches();

  const hideHeader = matches.some((match) => match.handle?.hideHeader as RouteHandle);
    return (
      <>
        {!hideHeader && <Header />}
        <main>
          <Outlet />
        </main>
      </>
    )
  }

  export default Layout;