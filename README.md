# MMM-YoureBeautiful
So this started as a way to play a random video in the centre of the screen with a caption.  The video would play at random intervals based on a dice roll and yuo would be able to play different videos based on date.

The idea was to emulate the [James Blunt National Lottery Adverts](https://www.youtube.com/watch?v=krCDg3slMew), but then I thought it could be used for birthday messages and scary pics on halloween, or even in a corporate context a marketing message.

However my Rpi is not man enough to be able to play the example videos so the play back is stuttery or simply does not work.

This project is now open to anyone to finish if they see value.

## things I was going to do
1. change the config so that any number of videos with meta data could be listed.  Probably as an array of bojects with a filename, caption and optional date.  the play back would select any video with todays date or where no videos had todays adte anyvideo with no date at all.
2. refresh the dom after every play so that it would be a different video each time if there are more than one.
3. refresh the dom every day at 00:00
4. find some way of uploading videos through a separate page
5. put in a canplay check for the selected video
