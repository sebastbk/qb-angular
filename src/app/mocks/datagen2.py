import json
import copy
import random
from datetime import datetime
from operator import attrgetter
from faker import Faker

users = ['QuizMaster', 'John', 'Anne', 'BatMan', 'Joker', 'jackal02']


def datetime_handler(x):
    if isinstance(x, datetime):
        return x.isoformat()
    raise TypeError('Unknown type')


# Models
class Model:
    def as_dict(self):
        return copy.deepcopy(self.__dict__)


class Tag(Model):
    def __init__(self, id, name):
        self.id = id
        self.name = name
        self.questions = set()
        self.sets = set()

    def add_question(self, q):
        self.questions.add(q)

    def add_collection(self, s):
        self.sets.add(s)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'question_count': len(self.questions),
            'set_count': len(self.sets)
        }


class Question(Model):
    def __init__(
        self, id, created_by, created_on, modified_on, difficulty,
        text, answer, alternate_answer=''):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.difficulty = difficulty
        self.text = text
        self.answer = answer
        self.alternate_answer = alternate_answer
        self.tags = set()

    def answer_widget(self):
        if isinstance(self.answer, datetime):
            return 'datetime'
        elif isinstance(self.answer, str):
            return 'str'
        raise Exception('Unknown answer type')

    def add_tag(self, tag):
        self.tags.add(tag)

    def as_dict(self):
        return {
            'id': self.id,
            'created_by': self.created_by,
            'created_on': self.created_on,
            'modified_on': self.modified_on,
            'difficulty': self.difficulty,
            'text': self.text,
            'answer': self.answer,
            'alternate_answer': self.alternate_answer,
            'answer_widget': self.answer_widget(),
            'tags': [tag.name for tag in self.tags] 
        }


class Collection(Model):
    def __init__(self, id, created_by, created_on, modified_on, title, question_count=0):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.title = title
        self.question_count = question_count
        self.tags = set()

    def add_tag(self, tag):
        self.tags.add(tag)

    def as_dict(self):
        return {
            'id': self.id,
            'created_by': self.created_by,
            'created_on': self.created_on,
            'modified_on': self.modified_on,
            'title': self.title,
            'question_count': self.question_count,
            'tags': [tag.name for tag in self.tags] 
        }


class Post(Model):
    def __init__(self, id, created_by, created_on, modified_on, title, lead, body):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.title = title
        self.lead = lead
        self.body = body


class TextMixin:
    def title(self):
        return self.fake.text(max_nb_chars=30)[:-1]


# Managers
class ModelManager:
    id = 100000

    def __init__(self, fake=Faker()):
        self.fake = fake

    @classmethod
    def next_id(cls):
        cls.id = cls.id + 1
        return cls.id

    @staticmethod
    def user(users=users):
        return random.choice(users)

    def datetime(self):
        return self.fake.past_datetime(start_date='-30d')


class TagManager(ModelManager):
    tags = {}

    def new_tag(self):
        name = ''
        while not name or name in self.tags:
            name = self.fake.word()
        tag = Tag(self.next_id(), name)
        self.tags[name] = tag
        return tag

    def make(self, k=1):
        return [self.new_tag() for _ in range(k)]

    @classmethod
    def export(cls):
        tags = [t.as_dict() for t in cls.tags.values()]
        with open('tags.ts', 'w') as f:
            template = "export const tags = JSON.parse(`{}`)".format
            f.write(template(json.dumps(tags, indent=2)))


class QuestionManager(ModelManager):
    questions = {}

    def __init__(self, tag_manager, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tag_manager = tag_manager

    def set_tags(self, question, tags=None, k=1):
        if tags is None:
            tags = self.tag_manager.tags.values()
        for tag in random.sample(set(tags), k):
            TagQuestionManager.add(tag, question)

    @staticmethod
    def difficulty():
        return random.randint(1, 5)

    def text(self):
        text = self.fake.text(max_nb_chars=140)
        return text[:-1] + '?'
    
    def answer(self):
        return self.fake.word()

    def new_question(self):
        dt = self.datetime()
        q = Question(
            id=self.next_id(), 
            created_by=self.user(), 
            created_on=dt,
            modified_on=dt,
            difficulty=self.difficulty(),
            text=self.text(),
            answer=self.answer()
        )
        self.set_tags(q, k=random.randint(1, 10))
        self.questions[q.id] = q

    def make(self, k=1):
        return [self.new_question() for _ in range(k)]
    
    @classmethod
    def export(cls):
        questions = [q.as_dict() for q in cls.questions.values()]
        with open('questions.ts', 'w') as f:
            template = "export const questions = JSON.parse(`{}`)".format
            f.writelines(template(json.dumps(questions, indent=2, default=datetime_handler)).split(r'\n'))


class CollectionManager(TextMixin, ModelManager):
    collections = {}

    def __init__(self, tag_manager, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tag_manager = tag_manager

    def set_tags(self, collection, tags=None, k=1):
        if tags is None:
            tags = self.tag_manager.tags.values()
        for tag in random.sample(set(tags), k):
            TagCollectionManager.add(tag, collection)

    def new_collection(self):
        dt = self.datetime()
        s = Collection(
            id=self.next_id(), 
            created_by=self.user(), 
            created_on=dt,
            modified_on=dt,
            title=self.title(),
            question_count=random.randint(1, 50)
        )
        self.set_tags(s, k=random.randint(1, 20))
        self.collections[s.id] = s

    def make(self, k=1):
        return [self.new_collection() for _ in range(k)]

    @classmethod
    def export(cls):
        collections = [c.as_dict() for c in cls.collections.values()]
        with open('collections.ts', 'w') as f:
            template = "export const collections = JSON.parse(`{}`)".format
            f.writelines(template(json.dumps(collections, indent=2, default=datetime_handler)).split(r'\n'))


class PostManager(TextMixin, ModelManager):
    posts = {}

    def new_post(self):
        dt = self.datetime()
        p = Post(
            id=self.next_id(), 
            created_by=self.user(), 
            created_on=dt,
            modified_on=dt,
            title=self.title(),
            lead=self.fake.paragraph(),
            body=self.fake.paragraphs(nb=random.randint(3, 10))
        )
        self.posts[p.id] = p

    def make(self, k=1):
        return [self.new_post() for _ in range(k)]

    @classmethod
    def export(cls):
        posts = [p.as_dict() for p in cls.posts.values()]
        with open('posts.ts', 'w') as f:
            template = "export const posts = JSON.parse(`{}`)".format
            f.writelines(template(json.dumps(posts, indent=2, default=datetime_handler)).split(r'\n'))


class TagQuestionManager:
    @staticmethod
    def add(tag, question):
        tag.add_question(question)
        question.add_tag(tag)


class TagCollectionManager:
    @staticmethod
    def add(tag, collection):
        tag.add_collection(collection)
        collection.add_tag(tag)


if __name__ == '__main__':
    tag_manager = TagManager()
    question_manager = QuestionManager(tag_manager)
    collection_manager = CollectionManager(tag_manager)
    post_manager = PostManager()

    tag_manager.make(100)
    question_manager.make(100)
    collection_manager.make(100)
    post_manager.make(20)

    tag_manager.export()
    question_manager.export()
    collection_manager.export()
    post_manager.export()
