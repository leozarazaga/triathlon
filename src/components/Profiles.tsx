interface Profiles {
    name: string,
    image: string
}

const Profiles = ({ name, image }: Profiles) => {
    return (
        <div>
            <img src={image} alt={name} className="rounded-circle"/>
        </div>
    );
};

export default Profiles;
