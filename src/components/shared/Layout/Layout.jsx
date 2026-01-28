import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-md-10 col-lg-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
