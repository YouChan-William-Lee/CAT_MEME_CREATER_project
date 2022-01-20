import CatItem from "./CatItem";

function Favorites({ favorites }) {
    if (favorites.length === 0) {
        return <div>Let's save the cat meme by clicking the heart button</div>
    }

    return (
        <ul className="favorites">
            {favorites.map((cat) => (
                <CatItem img={cat} key={cat} />
            ))}
        </ul>
    );
}

export default Favorites;