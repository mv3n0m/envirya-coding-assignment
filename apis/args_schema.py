from webargs import fields

datetime_args = {
    "start": fields.DateTime(required=True),
    "stop": fields.DateTime()
}