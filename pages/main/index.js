import MainNav from '../../components/layout/MainNav'
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function mainNavPage() {

    function mainNavHandler(enteredCrudpData) {

    }

    return <MainNav onMain={mainNavHandler} />

}

export default mainNavPage
export const getServerSideProps = withPageAuthRequired();