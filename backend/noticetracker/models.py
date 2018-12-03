from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.


class LectureTime(models.Model):
    day = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

    def toJson(self):
        return {'day': self.day, 'start': self.start, 'end': self.end}


class Article(models.Model):
    content = models.TextField(default="")
    url = models.TextField(default="")
    updated = models.DateTimeField(default=now)


class Site(models.Model):
    name = models.TextField(default="")
    url = models.TextField(default="")
    lastUpdated = models.DateTimeField(default=now)


class Course(models.Model):
    name = models.CharField(max_length=120)  # ex) Principles and Practices ...
    time = models.ManyToManyField(LectureTime)
    siteList = models.ManyToManyField(Site)
    lectureCode = models.CharField(max_length=120)  # ex) M1522.000100
    profName = models.CharField(max_length=120)
    classNumber = models.IntegerField()


Article.fromCourse = models.ForeignKey(
    Course, on_delete=models.CASCADE, related_name='article_set')
Site.articleList = models.ManyToManyField(Article)


class CourseCustom(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    siteList = models.ManyToManyField(Site)
    lastUpdated = models.DateTimeField(default=now)


class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courseList = models.ManyToManyField(CourseCustom)
    starList = models.ManyToManyField(Article, related_name="star")
    ignoreList = models.ManyToManyField(Article, related_name="ignore")
