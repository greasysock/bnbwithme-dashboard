import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** An ISO 8601-encoded date */
  ISO8601Date: any,
};

export type Ical = {
   __typename?: 'Ical',
  id: Scalars['ID'],
  link: Scalars['String'],
  property: Property,
  service: Scalars['String'],
};


export type Mutation = {
   __typename?: 'Mutation',
  /** An example field added by the generator */
  testField: Scalars['String'],
};

export type Property = {
   __typename?: 'Property',
  color?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  name: Scalars['String'],
  ownerId: Scalars['ID'],
  reservations?: Maybe<Array<Reservation>>,
};


export type PropertyReservationsArgs = {
  startDate: Scalars['ISO8601Date'],
  endDate: Scalars['ISO8601Date']
};

export type Query = {
   __typename?: 'Query',
  icals: Array<Ical>,
  properties: Array<Property>,
  reservations: Array<Reservation>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryReservationsArgs = {
  startDate: Scalars['ISO8601Date'],
  endDate: Scalars['ISO8601Date']
};


export type QueryUserArgs = {
  userId: Scalars['ID']
};

export type Reservation = {
   __typename?: 'Reservation',
  cleaner?: Maybe<User>,
  cleanerId?: Maybe<Scalars['Int']>,
  duration: Scalars['Int'],
  email?: Maybe<Scalars['String']>,
  end: Scalars['String'],
  guest?: Maybe<Scalars['String']>,
  ical?: Maybe<Ical>,
  icalId?: Maybe<Scalars['ID']>,
  id: Scalars['ID'],
  phone?: Maybe<Scalars['String']>,
  property: Property,
  start: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  admin?: Maybe<Scalars['Boolean']>,
  cleaner?: Maybe<Scalars['Boolean']>,
  cleanings?: Maybe<Array<Reservation>>,
  email: Scalars['String'],
  firstName: Scalars['String'],
  id: Scalars['ID'],
  lastName: Scalars['String'],
  properties?: Maybe<Array<Property>>,
};


