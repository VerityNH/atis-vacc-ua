import { Test } from '@nestjs/testing';
import { Dto } from 'src/dto';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

jest.mock('../app.service');

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
    jest.clearAllMocks();
  });

  describe('getAtis', () => {
    describe('when getAtis is called', () => {
      const dto: Dto = { icao: 'UKBB', rw: '36R', code: 'C' };
      let atis: string;

      beforeEach(async () => {
        atis = await appController.getAtis(dto);
      });

      test('then it should call appService', () => {
        expect(appService.getAtis).toBeCalledWith(dto);
      });

      test('then it should return atis', () => {
        expect(atis).toEqual('some atis');
      });
    });
  });
});
