# RepliCode

_Checkout this code recording platform here..._ [Demo Link](https://bit.ly/2AbCdGE)

## Description

Replicode is a content creation platform for creating interactive coding tutorials. We created a way for users to record their audio and the code they're writing in an editor. For users to be able to create these lessons, we had to develop a way to record the audio as well as their text editor and console events. We captured every state change within our text editor and console. We mapped these state changes to a specific timestamp that would then be used for playback. When the recording is finished, we used Redux to store these objects along with the audio blob we get from the browser. Due to the size of the audio files, we decided against storing them in our database. We chose Amazon S3 because it accepts a wide range of file types, and reliably allowed us store our raw audio data and stream it back onto our platform once a lesson is submitted.

To build the lesson view, we access our streamable audio file from Amazon S3. Using Sequelize, we grab rest of the lesson information from our postgres database. For the text to populate synchronously with the playing audio, we listen for the Web Audio API’s built in events to keep track of time updates. We sync these updates with the timestamp maps that we once again hold in our Redux store.

Users can stop the recording at any time and interact with the lesson’s code by adding their own. When they resume the lesson, the user’s input is cleared and playback continues as normal.By allowing users to run code, we had to protect our platform and our host servers from malicious code injection. We chose Docker over virtual machines because we could create a more lightweight containerized environment which sped up our development. We were then able to build a Dockerized Microservice API, ensuring that any attempted attacks would be contained in an isolated execution environment.

Here is the repo for our [dockerized microservice api](https://github.com/RepliCode/DockerApi)

## Application screenshots

#### Creating a lesson on Replicode
![Creating a lesson on Replicode](https://i.imgur.com/LApgIyP.gif)

#### Executing/Running code as a student
![Executing/Running code as a student](https://i.imgur.com/tCFqMEb.gif)

## Setup

run `git clone https://github.com/RepliCode/RepliCode.git` in your terminal

## Start

Be sure to `npm install` before attempting to run

Once you've installed the dependencies run `npm run start-dev` on your terminal

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

## Authors

[Chris Augustus Perez](https://github.com/chrisauinmotion), [Nabil Yafai](https://github.com/na-ya), [Jon Rosado](https://github.com/johnnybee4e), [ Jessie De La Cruz Santos](https://github.com/jessdelacruzsantos)
