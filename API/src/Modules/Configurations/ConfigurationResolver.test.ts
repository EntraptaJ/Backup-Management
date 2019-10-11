// API/src/Modules/Configurations/ConfigurationResolver.test.ts
import { execute } from 'API/Library/execute';
import { Configuration } from './ConfigurationModel';
import { factory } from 'API/Library/Factory';

describe.skip('Configuration Resolver', () => {
  test('hasSetup = False', async () => {
    const { data, errors } = await execute(
      `
      query hasSetup {
        hasSetup
      }
    `,
    );

    expect(data.hasSetup).toBe(false);
    expect(errors).toBeUndefined();
  });

  test('hasSetup = True', async () => {
    await factory.for(Configuration).create(1);

    const { data, errors } = await execute(
      `
      query hasSetup {
        hasSetup
      }
    `,
    );

    expect(data.hasSetup).toBe(true);
    expect(errors).toBeUndefined();
  });
});
