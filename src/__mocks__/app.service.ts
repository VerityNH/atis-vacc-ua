export const AppService = jest.fn().mockReturnValue({
  getAtis: jest.fn().mockResolvedValue('some atis'),
});
