interface Profiles {
    name: string,
    image: string
}

const Profiles = ({ name, image }: Profiles) => {
    return (
        <div>
            <img src={image} alt={name} className="rounded-circle"style={{ width: 120, height: 120, objectFit: 'cover' }}/>
            <p>{name}</p>
        </div>
    );
};

export default Profiles;
