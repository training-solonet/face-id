import cv2
import cv2.data
import numpy as np
import os

cap = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_alt.xml")

skip = 0
face_data = []
dataset_path = "Face-Recognition/face-data/"

if not os.path.exists(dataset_path):
    os.makedirs(dataset_path)

file_name = input("Input person name: ")

while True:
    ret, frame = cap.read()
    
    frame_flip = cv2.flip(frame, 1)
    
    gray_frame = cv2.cvtColor(frame_flip, cv2.COLOR_BGR2GRAY)
    
    if ret == False:
        continue
    
    faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
    
    if len(faces) == 0:
        continue
    
    k = 1
    
    faces = sorted(faces, key= lambda x:x[2]*x[3], reverse= True)
    
    skip += 1
    
    for face in faces[:1]:
        x, y, w, h = face
        
        offset = 5
        face_offset = frame_flip[y-offset:y+h+offset, x-offset: x+w+offset]
        face_selection = cv2.resize(face_offset, (100, 100))
        
        if skip % 10 == 0:
            face_data.append(face_selection)
            print(len(face_data))
            
        cv2.imshow(str(k), face_selection)
        k += 1
        
        cv2.rectangle(frame_flip, (x, y), (x+w, y+h), (0, 255, 0), 2)
        
    cv2.imshow("faces", frame_flip)
    
    key_pressed = cv2.waitKey(1) & 0xFF
    
    if key_pressed == ord(";"):
        break
    
face_data = np.array(face_data)
face_data = face_data.reshape((face_data.shape[0], -1))
print(face_data.shape)

np.save(os.path.join(dataset_path + file_name), face_data)
print("Dataset saved at: {}".format(dataset_path + file_name + '.npy'))

cap.release()
cv2.destroyAllWindows()