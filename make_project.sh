
git clone git@github.com:RedRabbitDevelopment/doskara-example-data-store.git
git clone git@github.com:RedRabbitDevelopment/doskara-example-project.git
git clone git@github.com:RedRabbitDevelopment/doskara-example-webfront.git
cd doskara-example-data-store
npm install
node index.js > output.log &
cd ../doskara-example-project
npm install
node index.js > output.log &
cd transformer
npm install
node index.js > output.log &
cd ../../doskara-example-webfront
npm install
node index.js > output.log &
URL=http://localhost:8000/
if which xdg-open > /dev/null
then
  xdg-open "$URL"
elif which gnome-open > /dev/null
then
  gnome-open "$URL"
fi
