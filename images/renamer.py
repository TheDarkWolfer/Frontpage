import os

folder_path = "./images"  # Replace with the actual folder path

if os.path.isdir(folder_path):
    image_files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and f.lower().endswith((".jpg", ".jpeg", ".png", ".gif"))]
    
    for i, file_name in enumerate(image_files):
        file_extension = os.path.splitext(file_name)[1]
        new_file_name = f"img{i+1}{file_extension}"
        os.rename(os.path.join(folder_path, file_name), os.path.join(folder_path, new_file_name))
        
    print("Images renamed successfully.")
else:
    print("Invalid folder path.")
