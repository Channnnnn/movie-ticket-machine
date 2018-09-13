import Navbar from '../components/Navbar';

const Index = () => (
    <section>
        <Navbar />
        <h1>HELLO WORLD from NEXTJS!</h1>
        <style jsx global> 
            {`
                a {
                    padding: 10px;
                    text-decoration:none;
                    color: green;
                }
            `}
        </style>
    </section>
);

export default Index;