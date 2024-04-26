import AppContainer from "./AppContainer";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
  return (
    <div className='app'>
      <Header />
      <AppContainer />
      <Footer />
    </div>
  );
}

export default AppLayout;
