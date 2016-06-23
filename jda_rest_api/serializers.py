from rest_framework import serializers
from jda_rest_api.models import Language,Submissions

class SubmissionsSerializer(serializers.ModelSerializer):
	    class Meta:
		     model = Submissions

class LanguageSerializer(serializers.ModelSerializer):
	    class Meta:
		     model = Language
