import { Fragment } from 'react'
function CreateNote() {
    return (
        <Fragment>
            <button className="btn btn-warning rounded-circle" data-toggle="modal" data-target="#modalCreateNote"><i class="fa fa-sticky-note" aria-hidden="true"></i></button>

            <div class="modal fade" id="modalCreateNote" tabindex="-1" role="dialog" aria-labelledby="modalCreateNoteTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Create new note</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateNote