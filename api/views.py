from django.shortcuts import render
from .serializers import EventSerializer,RegistrationSerializer
from rest_framework  import viewsets 
from .models import Event,Registration


# Create your views here.
class EventViewSet(viewsets.ModelViewSet):
    queryset=Event.objects.all()
    serializer_class=EventSerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset=Registration.objects.all()
    serializer_class=RegistrationSerializer   