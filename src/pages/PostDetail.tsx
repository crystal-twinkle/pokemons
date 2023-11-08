import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonApi from '../API/api';
import Loading from '../components/Loading';
import { IPost } from '../components/models';
import { useNavigate } from 'react-router-dom';
import '../assets/PostDetail.css';

const PostDetail = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<IPost>({} as IPost);
  const [isLoading, setIsLoading] = useState(false);
  const fetch = useCallback(async (search: string) => {
    try {
      setIsLoading(false);
      const response = await PokemonApi.getByName(search);
      setPokemon(response);
    } finally {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (name) {
      fetch(name);
    }
  }, [fetch, name]);

  function close() {
    navigate(-1);
  }

  function description() {
    return (
      <div className="post-detail-subwrap">
        <div className="post-detail">
          <h4>Pokemon name is {pokemon.name}</h4>
          <img src={pokemon.sprites.front_default} alt="front" />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <button className="btn-close" onClick={close}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`post-detail-wrap`}>
        <div onClick={close} className={`blackout`}></div>
        {isLoading ? description() : <Loading />}
      </div>
    </>
  );
};

export default PostDetail;
