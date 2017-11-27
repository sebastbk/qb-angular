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
        self.collections = set()

    def add_question(self, q):
        self.questions.add(q)

    def add_collection(self, s):
        self.collections.add(s)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'question_count': len(self.questions),
            'collection_count': len(self.collections)
        }


class Question(Model):
    def __init__(
        self, id, created_by, created_on, modified_on, avg_rating, difficulty,
        text, answer, alt_answer=''):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.rating = 0
        self.avg_rating = avg_rating
        self.favorite = False
        self.difficulty = difficulty
        self.text = text
        self.answer = answer
        self.alt_answer = alt_answer
        self.tags = set()
        self.collections = set()

    def answer_widget(self):
        if isinstance(self.answer, datetime):
            return 'date'
        elif isinstance(self.answer, str):
            return 'text'
        elif isinstance(self.number, int):
            return 'number'
        raise Exception('Unknown answer type')

    def add_tag(self, tag):
        self.tags.add(tag)

    def add_collection(self, collection):
        self.collections.add(collection)

    def as_dict(self):
        return {
            'id': self.id,
            'created_by': self.created_by,
            'created_on': self.created_on,
            'modified_on': self.modified_on,
            'rating': self.rating,
            'avg_rating': self.avg_rating,
            'favorite': self.favorite,
            'difficulty': self.difficulty,
            'text': self.text,
            'answer': self.answer,
            'alt_answer': self.alt_answer,
            'answer_widget': self.answer_widget(),
            'collections': [c.id for c in self.collections],
            'tags': [tag.name for tag in self.tags] 
        }


class Collection(Model):
    def __init__(self, id, created_by, created_on, modified_on, title, description):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.title = title
        self.description = description
        self.questions = set()
        self.tags = set()

    def add_tag(self, tag):
        self.tags.add(tag)

    def add_question(self, question):
        self.questions.add(question)

    def for_list(self):
        return {
            'id': self.id,
            'title': self.title
        }

    @property
    def question_count(self):
        return len(self.questions)

    @property
    def average_difficulty(self):
        return sum((x.difficulty for x in self.questions)) / self.question_count

    def as_dict(self):
        return {
            'id': self.id,
            'created_by': self.created_by,
            'created_on': self.created_on,
            'modified_on': self.modified_on,
            'title': self.title,
            'description': self.description,
            'question_count': self.question_count,
            'average_difficulty': self.average_difficulty,
            'questions': [x.id for x in self.questions],
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
            template = "export const tags = JSON.parse(`{}`);\n".format
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
    def avg_rating():
        return random.uniform(1.0, 5.0)

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
            avg_rating=self.avg_rating(),
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
            template = "export const questions = JSON.parse(`{}`);\n".format
            f.writelines(template(json.dumps(questions, indent=2, default=datetime_handler)).split(r'\n'))


class CollectionManager(TextMixin, ModelManager):
    collections = {}

    def __init__(self, tag_manager, question_manager, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tag_manager = tag_manager
        self.question_manager = question_manager

    def set_tags(self, collection, tags=None, k=1):
        if tags is None:
            tags = self.tag_manager.tags.values()
        for tag in random.sample(set(tags), k):
            TagCollectionManager.add(tag, collection)

    def set_questions(self, collection, questions=None, k=1):
        if questions is None:
            questions = self.question_manager.questions.values()
        for question in random.sample(set(questions), k):
            CollectionQuestionManager.add(collection, question)

    def new_collection(self):
        dt = self.datetime()
        c = Collection(
            id=self.next_id(), 
            created_by=self.user(), 
            created_on=dt,
            modified_on=dt,
            title=self.title(),
            description=self.fake.text(max_nb_chars=255)
        )
        self.set_tags(c, k=random.randint(1, 20))
        self.set_questions(c, k=random.randint(1, 50))
        self.collections[c.id] = c

    def make(self, k=1):
        return [self.new_collection() for _ in range(k)]

    @classmethod
    def export(cls):
        collections = [c.as_dict() for c in cls.collections.values()]
        with open('collections.ts', 'w') as f:
            template = "export const collections = JSON.parse(`{}`);\n".format
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
            template = "export const posts = JSON.parse(`{}`);\n".format
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


class CollectionQuestionManager:
    @staticmethod
    def add(collection, question):
        collection.add_question(question)
        question.add_collection(collection)


if __name__ == '__main__':
    tag_manager = TagManager()
    question_manager = QuestionManager(tag_manager)
    collection_manager = CollectionManager(tag_manager, question_manager)
    post_manager = PostManager()

    tag_manager.make(100)
    question_manager.make(100)
    collection_manager.make(100)
    post_manager.make(20)

    tag_manager.export()
    question_manager.export()
    collection_manager.export()
    post_manager.export()
