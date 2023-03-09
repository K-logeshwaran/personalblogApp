---
title: 'YouTube Bot'
time: '8'
uploaded_at: 'June 14 2012'
cover_image: 'https://raw.githubusercontent.com/K-logeshwaran/blogImages/main/youtubeBot.png'
caption: 'What I did was, by using animechan-api ,I fetched random quotes from random anime ,then using bing_image_downloader ,I downloaded one image for one character'
catagory : 'tech'
meta_desc : 'Here we see how to create a bot with python'
meta_keywords : 'python, py, automation, bot, moviepy, youtube-bot, python3, logesh, yourdevloki, yourDevLoki'
---


### Hi there ,

Am here to share my youtube bot. Yeah you read that right that's a youtube bot ,That creates or edits video and can even upload to youtube,but there is a catch that I will show guys soon. This Bot makes own video specially youtube shorts,and also has to ability to push it to youtube via [youtube data api v3](https://developers.google.com/youtube/v3/docs).It maintains or works as a editor for the following channel [Anime Love](https://www.youtube.com/channel/UC_1hFxTXgwuA202JOyFD0kw).Yeah 550 views in 2 days 🤩much more than I expected. Thanks to my editor or bot my of course 😉. and [And this guy](https://github.com/RocktimSaikia/anime-chan) and his [anime-api](https://animechan.vercel.app/) without you it just a dream bro .I owe you one✌️

![image not found](https://raw.githubusercontent.com/bradtraversy/next-markdown-blog/main/public/images/posts/img2.jpg)

# Resources used

* [moviepy](https://zulko.github.io/moviepy/)
    
* [animechan](https://animechan.vercel.app)
    
* [youtube data api v3](https://developers.google.com/youtube/v3/docs)
    
* [bing\_image\_downloader](https://github.com/gurugaurav/bing_image_downloader)
    

### Getting Started

First , create a virtual environment (in windows)

> py -m venv /path/to/new/virtual/environment

install moviepy

> pip install moviepy

install bing-image-downloader

> pip install bing-image-downloader

## Project Structure:

* \*\*asset folder \*\* for primary audio clips and
    
* **final\_cut** folder for the final video to upload
    

### Python Files

* **baseBgVid**
    
* **generate\_img**
    
* **download\_character**
    
* **my\_editor**
    
* **upload\_video**
    

**baseBgVid py**

### Overview

What I did was, by using [animechan-api](https://animechan.vercel.app) ,I fetched random quotes from random anime ,then using [bing\_image\_downloader](https://github.com/gurugaurav/bing_image_downloader) ,I downloaded one image for one character ,then by using [moviepy](https://zulko.github.io/moviepy/) I created a transparent image for the quote and the character ,then merged image ,quote and character image to form a 6 or 5 second video . I decided to show 3 quotes for three characters in one video ,to produce **final cut** I merged all three video and added a audio file .One youtube shorts is 30 second long so 6 time 3 is 18 seconds and 5 or 6 second intro video ,which is roughly around 24 to 27 seconds. To see its results visit [Anime Love](https://www.youtube.com/channel/UC_1hFxTXgwuA202JOyFD0kw).I know the final cut was not that great and this did come up that well ,but hopes it is a good side project **Please share me your thoughts about this guys ✌️**. Am eagerly waiting for the review

```py
from moviepy.editor import *

//getting a bg image from assets and converting it to a base background video
bg = ImageClip("assets/Image_10.jpg").set_duration("30")

//store it as a static permanent asseet
bg.write_videofile("assets/bgVid2.mp4",fps=30)
```

**generate\_image py**

```py
import requests
import json
from moviepy.editor import *
from downloadChar import download_image

//# def getQuote():
//#     # global i 
//#     # i+=1
//#     req = requests.get("https://animechan.vercel.app/api/random/")
//#     data = json.loads(req.content)
//#     data["location"] = [f"quote{i}.png",f"charName{i}.png"]
//#     return data

def createAssets():
    i=0
    def getQuote():
        i+=1
        req = requests.get("https://animechan.vercel.app/api/random/")
        data = json.loads(req.content)
        data["location"] = [f"quote{i}.png",f"charName{i}.png"]
        return data
    collections =[] 
    for j in range(3):
        collections.append(getQuote())

    datum = []
    for data in collections:

        txtClip = TextClip(  data["quote"],
                                color='black',
                                font="Forte",
                                # kerning = 5,
                                fontsize=45,
                                size=(600,450),
                                # print_cmd=True,
                                method="caption",
                                transparent=True
                                )
        txtClip.save_frame(data["location"][0])

        anime = data["anime"].replace(":",'-')
        loc =download_image(f'{data["character"]} from {anime}  image transparent background')
        data["charBgImg"]=loc
        print()
        print(data["character"])
        print()
        txtClip = TextClip(data["character"],
                                color='white',
                                font="Forte",
                                # kerning = 5,
                                fontsize=70,
                                size=(600,150),
                                # print_cmd=True,
                                transparent=True
                                )

        txtClip.save_frame(data["location"][1])
        datum.append(data)
    i=0
    print(datum)
    return datum
```py

**download\_character py**

```py
from bing_image_downloader import downloader
import os 

def download_image(query):
    downloader.download(query, limit=1,  output_dir='character', 
    adult_filter_off=True, force_replace=False, timeout=60)
    location = f"{os.getcwd()}/character/{query}"
    cr_loc = location.replace("\\","/")
    lst =os.listdir(cr_loc)
    ext_pth = cr_loc+"/"+lst[0]
    return ext_pth
```

**my\_editor**

```py
from moviepy.editor import *
from createQuote_gen_img import createAssets
import random
import os 

AUDIOCLIPS = ["./assets/bgm.mpeg","./assets/bgm2.mpeg"]
BGVID =["./assets/bgVid.mp4","./assets/bgVid2.mp4"]
INTROCLIPS =["/assets/vid1.mp4","/assets/intro.mp4"]

audio_loc = random.choice(AUDIOCLIPS)
bgv_loc = random.choice(BGVID)
intro_loc =random.choice(INTROCLIPS)


def getBgLoc(D):
    locs =[]
    for d in D:
        locs.append(d["charBgImg"])
    return locs


data = createAssets()
locations = {"quote":["quote1.png","quote2.png","quote3.png",],"charName":["charName1.png","charName2.png","charName3.png",],"bgImg":getBgLoc(data)}

for i in range(3):
    
    #previous
    

    major_clip = VideoFileClip(bgv_loc).subclip(0,6)
    quote = ImageClip(f"{locations['quote'][i]}").set_duration(6)
    char = ImageClip(f"{locations['charName'][i]}").set_duration(6)
    loc =f"{locations['bgImg'][i]}"
    charImg = ImageClip(loc).set_duration(6).resize((620,500))
    video = CompositeVideoClip([major_clip, quote.set_position((0.1,0.03),relative=True),charImg.set_position((0.1,0.45), relative=True),char.set_position((0.1,0.85),relative=True)]) 
    video.write_videofile(f"finalOut{i}.mp4", fps=30)


#previous


if intro_loc == INTROCLIPS[0]:
    intro = VideoFileClip(intro_loc).subclip(0,2).resize((740,1000))
    major_clip = major_clip.subclip(0,2)
else:    
    intro = VideoFileClip(intro_loc).subclip(0,6).resize((900,900))
    major_clip = major_clip.subclip(0,6)

video = CompositeVideoClip([major_clip, intro.set_position((0,0.05), relative=True)]) 
clp1 = VideoFileClip("finalOut0.mp4")
clp2 = VideoFileClip("finalOut1.mp4")
clp3 = VideoFileClip("finalOut2.mp4")

merged_clip = concatenate_videoclips([video,clp1,clp2,clp3])
# merged_clip.write_videofile("mergedClip.mp4",fps=30)
bg_audio = AudioFileClip("/assets/bgm.mpeg").subclip(0,24)
finalOutputVid = merged_clip.set_audio(bg_audio)
finalOutputVid.write_videofile("./final_cut/finalOutputVid.mp4",fps=30)

try:
    os.system("del /f /s /q character 1>nul")
    os.system("rmdir /s /q character")
    for i in range(3):
        os.system(f"del /f finalOut{i}.mp4")
        os.system(f"del /f quote{i+1}.png")
        os.system(f"del /f charName{i+1}.png")
        
    print("Delection Success")
except :
    print("Some thing went wrong on")

//# try:
//#     os.system(f'py upload_video.py --file="finalOutputVid.mp4" --title="Anime Quotes That hit different" --description="Anime Quotes That hit different Motivation" --keywords="motivation,anime quotes,anime anime shorts,quotes,naruto,dbs,dbz quotes,one piece " --category="22"')
//# except   Exception as err :
//#     print("Some thing went wrong on")
//#     print(err)
```

> **Note:** Before this ,make sure you set up a google cloud project to get access to the [youtube data api v3](https://developers.google.com/youtube/v3/docs)

**upload\_video py**

```py
//#!/usr/bin/python

import httplib2
import os
import random
import sys
import time

//# import apiclient

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import argparser, run_flow


//# Explicitly tell the underlying HTTP transport library not to retry, since
//# we are handling retry logic ourselves.
httplib2.RETRIES = 1

//# Maximum number of times to retry before giving up.
MAX_RETRIES = 10

//# Always retry when these exceptions are raised.
RETRIABLE_EXCEPTIONS = (httplib2.HttpLib2Error, IOError)

//# Always retry when an apiclient.errors.HttpError with one of these status
//# codes is raised.
RETRIABLE_STATUS_CODES = [500, 502, 503, 504]

//# The CLIENT_SECRETS_FILE variable specifies the name of a file that contains
//# the OAuth 2.0 information for this application, including its client_id and
//# client_secret. You can acquire an OAuth 2.0 client ID and client secret from
//# the Google API Console at
//# https://console.cloud.google.com/.
//# Please ensure that you have enabled the YouTube Data API for your project.
//# For more information about using OAuth2 to access the YouTube Data API, see:
//#   https://developers.google.com/youtube/v3/guides/authentication
//# For more information about the client_secrets.json file format, see:
//#   https://developers.google.com/api-client-library/python/guide/aaa_client_secrets
CLIENT_SECRETS_FILE = "client_secrets.json"

//# This OAuth 2.0 access scope allows an application to upload files to the
//# authenticated user's YouTube channel, but doesn't allow other types of access.
YOUTUBE_UPLOAD_SCOPE = "https://www.googleapis.com/auth/youtube.upload"
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

//# This variable defines a message to display if the CLIENT_SECRETS_FILE is
//# missing.
MISSING_CLIENT_SECRETS_MESSAGE = """
WARNING: Please configure OAuth 2.0

To make this sample run you will need to populate the client_secrets.json file
found at:

   %s

with information from the API Console
https://console.cloud.google.com/

For more information about the client_secrets.json file format, please visit:
https://developers.google.com/api-client-library/python/guide/aaa_client_secrets
""" % os.path.abspath(os.path.join(os.path.dirname(__file__),
                                   CLIENT_SECRETS_FILE))

VALID_PRIVACY_STATUSES = ("public", "private", "unlisted")


def get_authenticated_service(args):
  flow = flow_from_clientsecrets(CLIENT_SECRETS_FILE,
    scope=YOUTUBE_UPLOAD_SCOPE,
    message=MISSING_CLIENT_SECRETS_MESSAGE)

  storage = Storage("%s-oauth2.json" % sys.argv[0])
  credentials = storage.get()

  if credentials is None or credentials.invalid:
    credentials = run_flow(flow, storage, args)

  return build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    http=credentials.authorize(httplib2.Http()))

def initialize_upload(youtube, options):
  tags = None
  if options.keywords:
    tags = options.keywords.split(",")

  body=dict(
    snippet=dict(
      title=options.title,
      description=options.description,
      tags=tags,
      categoryId=options.category
    ),
    status=dict(
      privacyStatus=options.privacyStatus
    )
  )

  //# Call the API's videos.insert method to create and upload the video.
  insert_request = youtube.videos().insert(
    part=",".join(body.keys()),
    body=body,
    //# The chunksize parameter specifies the size of each chunk of data, in
    //# bytes, that will be uploaded at a time. Set a higher value for
    //# reliable connections as fewer chunks lead to faster uploads. Set a lower
    //# value for better recovery on less reliable connections.
    //#
    //# Setting "chunksize" equal to -1 in the code below means that the entire
    //# file will be uploaded in a single HTTP request. (If the upload fails,
    //# it will still be retried where it left off.) This is usually a best
    //# practice, but if you're using Python older than 2.6 or if you're
    //# running on App Engine, you should set the chunksize to something like
    //# 1024 * 1024 (1 megabyte).
    media_body=MediaFileUpload(options.file, chunksize=-1, resumable=True)
  )

  resumable_upload(insert_request)

//# This method implements an exponential backoff strategy to resume a
//# failed upload.
def resumable_upload(insert_request):
  response = None
  error = None
  retry = 0
  while response is None:
    try:
      print ("Uploading file...")
      status, response = insert_request.next_chunk()
      if response is not None:
        if 'id' in response:
          print ("Video id '%s' was successfully uploaded." % response['id'])
        else:
          exit("The upload failed with an unexpected response: %s" % response)
    except HttpError as e:
      if e.resp.status in RETRIABLE_STATUS_CODES:
        error = "A retriable HTTP error %d occurred:\n%s" % (e.resp.status,
                                                             e.content)
      else:
        raise
    except RETRIABLE_EXCEPTIONS as e:
      error = "A retriable error occurred: %s" % e

    if error is not None:
      print (error)
      retry += 1
      if retry > MAX_RETRIES:
        exit("No longer attempting to retry.")

      max_sleep = 2 ** retry
      sleep_seconds = random.random() * max_sleep
      print ("Sleeping %f seconds and then retrying..." % sleep_seconds)
      time.sleep(sleep_seconds)

if __name__ == '__main__':
  argparser.add_argument("--file", required=True, help="Video file to upload")
  argparser.add_argument("--title", help="Video title", default="Test Title")
  argparser.add_argument("--description", help="Video description",
    default="Test Description")
  argparser.add_argument("--category", default="22",
    help="Numeric video category. " +
      "See https://developers.google.com/youtube/v3/docs/videoCategories/list")
  argparser.add_argument("--keywords", help="Video keywords, comma separated",
    default="")
  argparser.add_argument("--privacyStatus", choices=VALID_PRIVACY_STATUSES,
    default=VALID_PRIVACY_STATUSES[0], help="Video privacy status.")
  args = argparser.parse_args()

  if not os.path.exists(args.file):
    exit("Please specify a valid file using the --file= parameter.")

  youtube = get_authenticated_service(args)
  try:
    initialize_upload(youtube, args)
  except HttpError as e:
    print ("An HTTP error %d occurred:\n%s" % (e.resp.status, e.content))
```

### The Problem

I can't able to publish the video directly to youtube via [youtube data api v3](https://developers.google.com/youtube/v3/docs) , I can and it also uploads it successfully but youtube suddenly makes the video private and sends me a warning mail that my content missing the community guidelines but when I upload the same video manually it successfully uploads to youtube . If this problem was not there only one time I want to run this script only once and it automatically uploads for me forever . Sadly youtube said no to it 😒 because they had changed their polices on uploading video via [youtube data api v3](https://developers.google.com/youtube/v3/docs) from the end of 2020

## Conclusion

This is **my very first blog post guys** very exited to see its review . Hope I didn't waste your time and hope this bot have some potential if so let me know it [**repo**](https://github.com/K-logeshwaran/youtubeBot/) **of the bot**. **Thank you for reading my content . See you in the next one, Until its bye from yourdevlogesh003 peace ✌️**