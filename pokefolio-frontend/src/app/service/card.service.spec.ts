import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CardService, NewCard } from './card.service';
import { CardType } from '../data/card-type';
import { Card } from '../data/card';
import { environment } from '../../environments/environment';

describe('CardService', () => {
  let service: CardService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.backendBaseUrl}card`;

  const newCard: NewCard = {
    cardType: CardType.POKEMON,
    name: 'Pikachu',
    type: 'Electric',
    hp: 60,
    rarity: 'Common',
    setName: 'Base Set',
    cardNumber: '25/102',
    imageUrl: 'https://example.com/pikachu.png'
  };

  const fakeCard: Card = { id: 1, ...newCard };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      teardown: { destroyAfterEach: true }
    });
    service = TestBed.inject(CardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cards', () => {
    service.getAll().subscribe(cards => expect(cards).toHaveLength(1));

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush([fakeCard]);
  });

  it('should get a single card by id', () => {
    service.getById(1).subscribe(card => expect(card).toEqual(fakeCard));

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(fakeCard);
  });

  it('should create a card', () => {
    service.create(newCard).subscribe(card => expect(card).toEqual(fakeCard));

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCard);
    req.flush(fakeCard);
  });

  it('should update a card', () => {
    service.update(1, newCard).subscribe(card => expect(card).toEqual(fakeCard));

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(newCard);
    req.flush(fakeCard);
  });

  it('should delete a card', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
