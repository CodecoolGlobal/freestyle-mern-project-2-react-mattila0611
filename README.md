<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield-attila]][linkedin-url-attila]

<div align="center">
  <a href="https://github.com/CodecoolGlobal/freestyle-mern-project-2-react-mattila0611">
    <img src="https://static.wikia.nocookie.net/logopedia/images/3/32/Who_Wants_to_Be_a_Millionaire_syndicated_logo_%282002_version%29.png/revision/latest?cb=20220118032546" alt="Logo" width="300" height="300">
  </a>

<h3 align="center">Who Wants To Be A Millionaire</h3>

  <p align="center">
    A MERN stack powered trivia game based on the television show Who Wants To Be A Millionaire. Challenge your knowledge on a wide range of topics while competing against other players.
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#showcase">Project showcase</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## Showcase

Login page:
<br />

![Login](https://i.ibb.co/NKzDPt0/SCR-20231011-ngne.jpg)
<br />

Main menu:
<br />

![Menu](https://i.ibb.co/sjsxZcy/SCR-20231011-ngyn.jpg)
<br />


Game options:
<br />

![Options](https://i.ibb.co/V2N98P9/SCR-20231011-nhft.jpg)
<br />

Game:
<br />

![Game](https://i.ibb.co/646JCRs/SCR-20231011-pded.jpg)

Answering questions:
<br />

![Answering](https://s6.gifyu.com/images/S6QAl.gif)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<p>Frontend:</p>

-   [![Javascript][Javascript]][Javascript-url]
-   [![React][React.js]][React-url]
-   [![CSS][CSS]][CSS]
  
<p>Backend:</p>

-   [![Node.js][NodeJS]][NodeJS-url]
-   [![Express.js][Express.js]][Express.js-url]
-   [![MongoDB][MongoDB]][MongoDB-url]
-   [![Mongoose][Mongoose]][Mongoose-url]
-   [![Dotenv][Dotenv]][Dotenv-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow this guide to run the application.

### Prerequisites

- Have NodeJS installed on your system. You can get NodeJS here: https://nodejs.org/en/download

- Create a free database at MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas/register and register an account.
2. After logging in click the `Database` item from the left sidebar and then click `Build database`.
3. You will see multiple price plans, select the free one.
4. Select a provider, select the region that is the closest to you, name your database and click on `Create`.
5. On the next page you will need to create an user for the database. Select `Username and Password`, choose an username and a password and click `Create User`.
6. At the bottom of this page click `Add My Current IP Address`.
7. Click `Finish and Close`
8. You will be redirected to the Overview page, if you did everything correctly, the database you created should show up here.
9. Click on `Connect` and then `Compass`. You don't need to download anything, only the connection string is needed from here.
10. Copy the connection string and replace the `<password>` part with the password you previously created for this database. You will need this string in the <a href="#installation">Installation</a> part of this guide.

### Installation

1. Open the terminal.
2. Clone the repository.
    ```sh
    git clone git@github.com:CodecoolGlobal/freestyle-mern-project-2-react-mattila0611.git
    ```
3. Navigate into the `client` folder:
   ```sh
   cd freestyle-mern-project-2-react-mattila0611/client/
   ```
4. Install the NPM packages
    ```sh
    npm install
    ```
5. Navigate into the `server` folder:
   ```sh
   cd ../server/
   ```
6. Install the NPM packages for this folder too
    ```sh
    npm install
    ```
7. Open a text editor and write the following into a new text file:
   ```sh
   MONGO_URL=<your connection string>
   ```
   Replace the `<your connection string>` part with the connection string you copied in the Prerequisites section.
   Save this file in the `/server` directory as `.env` (don't write any name just the .env extension)
    
### Usage

1. Open two separate terminals and navigate to the project directory.
2. Navigate to the `server` folder and run this command:
   ```sh
   node server.js
   ```
   The ExpressJS server will start, leave this running during the usage.
3. Navigate to the `client` folder in the other terminal and run this command:
   ```sh
   npm start
   ```
   The React development server will start, leave this running during the usage.
4. Open your browser and go to this address: http://localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Attila Makó - mattila0611@gmail.com

Project Link: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-mattila0611

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/CodecoolGlobal/gotta-fetch-em-all-react-mattila0611.svg?style=for-the-badge
[contributors-url]: https://github.com/CodecoolGlobal/freestyle-mern-project-2-react-mattila0611/graphs/contributors

[linkedin-shield-attila]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-attila]: https://www.linkedin.com/in/makoattila/

[Javascript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black
[Javascript-url]: https://www.javascript.com
[CSS]: https://img.shields.io/badge/css-2c4bdc?style=for-the-badge&logo=CSS3&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-90EE90.svg?style=for-the-badge&logo=MongoDB&logoColor=black
[MongoDB-url]: https://www.mongodb.com
[Mongoose]: https://img.shields.io/badge/Mongoose-8B0000.svg?style=for-the-badge&logo=Mongoose&logoColor=FFFFFF
[Mongoose-url]: https://mongoosejs.com
[Dotenv]: https://img.shields.io/badge/Dotenv-F7DF1E.svg?style=for-the-badge&logo=.ENV&logoColor=black
[Dotenv-url]: https://www.npmjs.com/package/dotenv
