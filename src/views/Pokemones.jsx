import { useState, useEffect, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Form, Button, ListGroup, Card } from "react-bootstrap";

import { MyContext } from "../Context";

export default function Pokemones() {
    const navigate = useNavigate();

    const { pokemones } = useContext(MyContext); // arreglo de pokemones

    const [namePok, setNamePoke] = useState(''); // name pokemon

    const [selectPoke, setSelectPoke] = useState(); // pokemon selected

    const [selectOk, setSelectOk] = useState(false);




    const irAPersonajes = (e) => {
        e.preventDefault();
        navigate(`/pokemones/${namePok}`); // url :namePokemon send
    };

    const { namePokemon } = useParams(); // url :namePokemon get


    useEffect(() => {

        if (namePokemon) {
            getPokemon(namePokemon);
        }else{
         setSelectOk(false);

        }
    }, [namePokemon]);

    const getPokemon = async (n) => {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${n}`;
        const response = await fetch(endpoint);
        let { id, name, sprites, stats } = await response.json();

        stats = stats.map(({ base_stat, stat }) => ({
            statName: stat.name,
            base_stat: base_stat
        }))

        let pokemon = {
            id: id,
            name: name,
            photo: sprites.other.dream_world.front_default,
            stats
        }

        // id, name, sprites, stats

        setSelectPoke(pokemon);
        setSelectOk(true);
    }


    return (
        <div className="mt-5">

            {selectOk ?
                <div>
                    <h1>{selectPoke.name}</h1>
                    <Card className="m-auto d-flex flex-row" style={{ width: '30rem' }}>
                        <Card.Img className="w-50" variant="top" src={selectPoke.photo} />
                        <Card.Body>
                            <Card.Title>{selectPoke.name}</Card.Title>
                            <ListGroup>
                                {
                                    (selectPoke.stats).map((p, i) => {
                                        return (
                                            <ListGroup.Item key={i}>{p.statName} : {p.base_stat}</ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>

                </div>
                :
                <div>
                    <h1>Selecciona un pokemon</h1>
                    <form action="" className="w-50 m-auto" onSubmit={irAPersonajes}>
                        <Form.Select className="text-center" aria-label="Default select example" onChange={({ target }) => {
                            setNamePoke(target.value)

                        }}>
                            <option value='pokemones' key='pokemones'>Pokemones</option>
                            {
                                pokemones.map(({ name }) =>
                                    <option value={name} key={name} >{name}</option>
                                )
                            }
                        </Form.Select>
                        <Button type="submit">Ver Pokemon</Button>
                    </form>

                </div>
            }



        </div >
    );
}
