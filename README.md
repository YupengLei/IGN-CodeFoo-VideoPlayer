# IGN-CodeFoo-VideoPlayer
> A web application created with React
## 🚩 Table of Contents  
* [Demo](#-Demo)
* [IGNPloblem](#-IGNProblem) 
* [Description](#-Description) 
* [Tech](#-Tech)
* [Credits](#-Credits)
* [License](#-License)

## 🚩 Demo
[Demo](https://yupenglei.github.io/IGN-CodeFoo-VideoPlayer/)  
![screenshot](https://github.com/YupengLei/IGN-CodeFoo-VideoPlayer/blob/main/public/screenshot.png)

## 🚩 IGNProblem 
Hisui's New Power Plant<br />
According to [link0](https://bulbapedia.bulbagarden.net/wiki/Voltorb_(Pok%C3%A9mon) ), Voltorb can generate power by a move called thunder shock when it reaches level 1. The power value is 40.<br />
According to [link1](https://bulbapedia.bulbagarden.net/wiki/Electric_(type) ), a move called volt thunderbolt generates 10,000,000 volt, at a power value of 195. <br />
Assume that one Voltorb can generate 40 / 195 * 10,000,000 = 2052 kilovolt at best.<br />
According to [link2](https://bulbapedia.bulbagarden.net/wiki/Jubilife_City) , we know that Jubilife is<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Largest city in the region Sinnoh;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Most modernized city in the region Sinnoh;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A place with TV station, Poketch Company, Trainers’s school, Global Trade station;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A population of 87 - 124;<br />
According to [link3](https://gamerant.com/pokemon-regions-real-world-kanto-johto-hoenn-sinnoh-unova-kalos-alola-galar/#:~:text=Sinnoh%2C%20however%2C%20is%20based%20largely,islands%20of%20Sakhalin%20and%20Kunashir) , Sinnoh is based largely on the Hokkaido region of Japan.  <br />
According to [link4](https://www.ees.hokudai.ac.jp/carbon/mfujii/en/wp-content/uploads/sites/2/2015/04/enechen100_en_ver2015.pdf) , Hokkaido uses 31.2 billion kWh in 2020.  <br />
The population of Hokkaido is 5.28 million, which means each person uses about 31200 / 5.28 = 5909 kWh per year. The consumption of electricity of Jubilife is 5909 * (87 + 124) / 2 = 623400 kWh.<br />
According to [link5](https://www.thegamer.com/pokemon-sinnoh-locations-visit-real-world/), Jubilife is based on Sapporo, Hokkaido.<br /> 
According to [link6]( https://dataportalforcities.org/east-asia/japan/hokkaido/sapporo-shi) , Sapparo uses 37800 TJ of electricity in 2016, which is 37800 * 278000 = 10.5 billion kWh, population of Sapparo is 1.95 million, per capita consumption is 10500 / 1.95 = 5385 kWh per year. The consumption of electricity of Jubilife is 5385 * (87 + 124) / 2 = 568118 kWh.<br />
Assume that Jubilife uses (623400 + 568118) / 2 = 595759 kWh  per year.<br />
Assumimg amps = 1.0, each Voltorb generates 4103 kW, that is 2052 * 24 * 365 = 17975520 kWh, which is larger than 595759, we only need one Voltorb to work constantly.<br />


## 🚩 Description  
This app features include a responsive, single-page web app for IGN video playlists based on the UI design mock below, using API.
Include a video player area, stylized video controls, and the playlist queue. 

## 🚩 Tech
React JS

## 🚩 Credits 
@Author Yupeng Lei

## 🚩 License  
The MIT License




