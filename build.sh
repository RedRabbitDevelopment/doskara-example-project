NAME=$1
PORTS=$2
LINKS=$3
LOG_LOCATION="logs/$(echo $NAME).log"
tar cC $NAME . | ../buildstep/buildstep/buildstep $NAME > /dev/null
COMMAND="docker run -d --name $NAME $PORTS$LINKS$NAME /bin/bash -c \"/start web\""
echo "Running command $COMMAND"
ID=$(eval ${COMMAND})
echo "WITH $ID"
docker logs -f $ID &>> $LOG_LOCATION &
