import {useState, PointerEvent} from 'react';
import {cities} from '../../constants';
import {OffersType} from '../../types/offers';

import TabItem from '../../components/tab-item/tab-item';
import OffersList from '../../components/offers-list/offers-list';

type MainScreenProps = {
  offers: OffersType,
}

// TODO: убрать data-temp

const MainScreen = ({offers}: MainScreenProps): JSX.Element => {
  const [activeOfferId, setActiveOfferId] = useState(0);

  const offerMouseOverHandler = (evt: PointerEvent<HTMLDivElement>) => {
    setActiveOfferId(Number(evt.currentTarget.id));
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => <TabItem city={city} key={Math.random()}/>)}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <OffersList offers={offers} onOfferMouseOver={offerMouseOverHandler}/>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" data-temp={activeOfferId}/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainScreen;
