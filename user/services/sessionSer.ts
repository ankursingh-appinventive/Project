import {Session} from '../models/sessionMod'
import { createClient } from 'redis';

export class sessionSer{
    static createSession = async (userID, deviceID) => {
        try {
          const session = await Session.create({
            userID,
            isActive: true,
            deviceID
          });
          const client = createClient();  client.on("error", (err) => console.log("redis Client Error", err));  await client.connect();
          await client.set(`status:${userID}`, 'true');
          return session;
        } catch (error) {
          console.error(error);
          throw new Error('Something went wrong in creating user session.');
        }
      };
}

