import '../scss/styles.scss';
import Poster from '../components/Poster';
import TableEntry from '../components/TableEntry';

const data = {
    movies:[
        {name: "Deadpool2", duration: 95},
        {name: "Ghostland", duration: 125},
        {name: "Avengers : Infinity War", duration: 102},
        {name: "Midnight Sun", duration: 93},
        {name: "The Nun", duration: 87}
    ]
}

const Index = () => (
    <div>
        <section className="main">
            <h1 className="center">Now Showing</h1>
            <div className="flex row center tighten scroll">
                {console.log(data)}
                {data.movies.map((movie) => (
                    <Poster movie={movie}></Poster>
                ))}
            </div>
        </section>
        <TableEntry></TableEntry>
    </div>
);

export default Index;