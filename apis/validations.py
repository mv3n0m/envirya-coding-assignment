
def validate_datetime_range(args):
    start, stop = args["start"], args["stop"]
    if start > stop:
        raise ValidationError("The end datetime must not precede the start datetime")
