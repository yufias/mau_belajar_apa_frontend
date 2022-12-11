import '../styles/globals.css'
import ErrorBoundary from '../src/components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    )
}

export default MyApp
