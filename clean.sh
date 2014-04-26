docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images | grep doskara-example- | awk '{print $3}')
docker rmi $(docker images | grep none | awk '{print $3}')
echo "" > logs/doskara-example-project
echo "" > logs/doskara-example-data-store.log
echo "" > logs/doskara-example-webfront.log
