import Header from "./Header";
import AppContainer from "./AppContainer";
import Footer from "./Footer";

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
