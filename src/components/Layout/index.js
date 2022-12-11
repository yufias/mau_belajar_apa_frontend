import Header from "./Header";
import Footer from "./Footer";
import Navbar from "../molecules/Navbar";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Navbar />
            {children}
            {/* <Footer /> */}
        </>
    )
}

export default Layout;