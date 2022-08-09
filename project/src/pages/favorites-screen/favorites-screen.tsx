import {useState, useEffect} from 'react';
import {OffersType} from '../../types/offers';
import cn from 'classnames';
import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Footer from '../../components/footer/footer';
import FavoritesItem from '../../components/favorites-item/favorites-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoritesAction} from '../../store/api-actions';

type OffersIndexType = {
  [key: string]: OffersType,
}

const indexOffersByCities = (offers: OffersType): OffersIndexType => (
  offers.reduce((acc: OffersIndexType, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {})
);

const FavoritesScreen = (): JSX.Element => {
  const [isEmpty, setIsEmpty] = useState(true);
  const dispatch = useAppDispatch();
  const favoritesOffers = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());

    if (favoritesOffers.length !== 0) {
      setIsEmpty(false);
    }
  }, [isEmpty, favoritesOffers]);

  const indexedOffers = indexOffersByCities(favoritesOffers);

  const mainClasName = cn('page__main page__main--favorites', {
    'page__main--favorites-empty': isEmpty,
  });

  const titleClassName = cn({
    'visually-hidden': isEmpty,
    'favorites__title': !isEmpty,
  });

  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <main className={mainClasName}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty ? 'favorites--empty' : ''}`}>
            <h1 className={titleClassName}>Saved listing</h1>
            {isEmpty
              ? <FavoritesEmpty />
              :
              <ul className="favorites__list">
                {Object.entries(indexedOffers)
                  .map(([city, localOffers]) => (
                    <FavoritesItem cityName={city} localOffers={localOffers} key={city}/>
                  ))}
              </ul>}
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default FavoritesScreen;
