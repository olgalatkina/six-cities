import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import {
  NUMBER_OF_NEIGHBOURHOOD,
  NUMBER_OF_IMAGES,
  Type,
  AuthorizationStatus,
  Status,
} from '../../constants';
import Header from '../../components/header/header';
import HeaderNav from '../../components/header-nav/header-nav';
import OfferImageWrapper from '../../components/offer-image-wrapper/offer-image-wrapper';
import OfferInsideItem from '../../components/offer-inside-item/offer-inside-item';
import Near from '../../components/near/near';
import Review from '../../components/review/review';
import FormReview from '../../components/form-review/form-review';
import Map from '../../components/map/map';
import Loading from '../../components/loading/loading';
import SomethingWrong from '../../components/something-wrong/something-wrong';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  fetchActiveOfferAction,
  fetchReviewsAction,
  fetchNeighbourhoodAction,
} from '../../store/api-actions';
import ButtonBookmark from '../../components/button-bookmark/button-bookmark';
import { getAuthStatus } from '../../store/user-process/selectors';
import { getActiveOffer, getStatusOffer, getNeighbourhood } from '../../store/offers-data/selectors';
import { getSortedReviews } from '../../store/reviews-data/selectors';

const OfferScreen = (): JSX.Element => {
  const params = useParams();
  const offerID = Number(params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveOfferAction(offerID));
    dispatch(fetchNeighbourhoodAction(offerID));
    dispatch(fetchReviewsAction(offerID));
  }, [offerID, dispatch]);

  const authorizationStatus = useAppSelector(getAuthStatus);
  const status = useAppSelector(getStatusOffer);
  const currentOffer = useAppSelector(getActiveOffer);
  const reviews = useAppSelector(getSortedReviews);
  const neighbourhood = useAppSelector(getNeighbourhood).slice(0, NUMBER_OF_NEIGHBOURHOOD);

  if (currentOffer === null || status === Status.Idle || status === Status.Loading) {
    return (
      <Loading />
    );
  }

  if (status === Status.Error) {
    return (
      <SomethingWrong />
    );
  }

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const {
    id,
    images,
    title,
    isPremium,
    rating,
    price,
    isFavorite,
    type,
    bedrooms,
    maxAdults,
    goods,
    host,
    description,
  } = currentOffer;

  const avatarWrapperClassName = cn('property__avatar-wrapper user__avatar-wrapper', {
    'property__avatar-wrapper--pro': host.isPro,
  });

  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, NUMBER_OF_IMAGES).map((src) => (
                <OfferImageWrapper src={src} offer={currentOffer} key={src} />
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <ButtonBookmark isFavorite={isFavorite} offerID={id} isBig />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {Type[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => <OfferInsideItem item={item} key={item} />)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={avatarWrapperClassName}>
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt={host.name}
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  <span className="property__user-status">{host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {reviews.map((review) => <Review review={review} key={review.id} />)}
                </ul>
                {isAuth && <FormReview offerID={offerID} />}
              </section>
            </div>
          </div>
          <Map cityInfo={currentOffer.city} points={[currentOffer, ...neighbourhood]} activeOfferID={offerID} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <Near neighbourhood={neighbourhood} />
          </section>
        </div>
      </main>
    </>
  );
};

export default OfferScreen;
