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

    def add_set(self, s):
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

    def answer_type(self):
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
            'answer_type': self.answer_type(),
            'tags': [tag.name for tag in self.tags] 
        }


class Set(Model):
    def __init__(self, id, created_by, created_on, modified_on, title):
        self.id = id
        self.created_by = created_by
        self.created_on = created_on
        self.modified_on = modified_on
        self.title = title
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
            'tags': [tag.name for tag in self.tags] 
        }


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
            f.write(template(json.dumps(questions, indent=2, default=datetime_handler)))


class SetManager(ModelManager):
    sets = {}

    def __init__(self, tag_manager, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tag_manager = tag_manager

    def set_tags(self, set_, tags=None, k=1):
        if tags is None:
            tags = self.tag_manager.tags.values()
        for tag in random.sample(set(tags), k):
            TagSetManager.add(tag, set_)

    def title(self):
        return self.fake.words(max_nb_chars=30)

    def new_set(self):
        dt = self.datetime()
        s = Set(
            id=self.next_id(), 
            created_by=self.user(), 
            created_on=dt,
            modified_on=dt,
            title=self.title()
        )
        self.set_tags(s, k=random.randint(1, 20))
        self.sets[s.id] = s

    def make(self, k=1):
        return [self.new_set() for _ in range(k)]

    @classmethod
    def export(cls):
        sets = [s.as_dict() for s in cls.sets.values()]
        with open('sets.ts', 'w') as f:
            template = "export const sets = JSON.parse(`{}`)".format
            f.write(template(json.dumps(sets, indent=2, default=datetime_handler)))


class TagQuestionManager:
    @staticmethod
    def add(tag, question):
        tag.add_question(question)
        question.add_tag(tag)


class TagSetManager:
    @staticmethod
    def add(tag, set):
        tag.add_set(set)
        set.add_tag(tag)


if __name__ == '__main__':
    tag_manager = TagManager()
    question_manager = QuestionManager(tag_manager)
    set_manager = SetManager(tag_manager)
    tag_manager.make(100)
    question_manager.make(100)
    set_manager.make(100)
    tag_manager.export()
    question_manager.export()
    set_manager.export()
