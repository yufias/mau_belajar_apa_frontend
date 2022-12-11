import Layout from '../src/components/Layout';
import Event from '../src/components/template/Event';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        if(!localStorage.getItem('session_collection')) {
            localStorage.setItem('session_collection', JSON.stringify([]))
        }
    }, [])

    return (
        <Layout>
            <Event />
        </Layout>
    )
}
