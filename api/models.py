from django.db import models
class Event(models.Model):
    eventname=models.CharField(max_length=100)
    time=models.TimeField()
    date=models.DateField()
    location=models.CharField(max_length=100)
    description=models.TextField()

class Registration(models.Model):
 event =models.ForeignKey(Event,related_name='registrations',on_delete=models.CASCADE)
name=models.CharField()
email=models.EmailField()
    

 
 