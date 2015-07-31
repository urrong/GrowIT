sudo killall mjpg_streamer
sudo /home/pi/mjpg-streamer/mjpg_streamer -i "/home/pi/mjpg-streamer/input_uvc.so -f 30 -r 320x240 -n -y" -o "/home/pi/mjpg-streamer/output_http.so -p 8888 -w /home/pi/mjpg-streamer/www" &
sudo node server/server.js
