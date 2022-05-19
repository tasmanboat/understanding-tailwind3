import { Component, OnInit } from '@angular/core';
import { PersistentStorageService } from 'src/app/core/services/persistent-storage.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private pss: PersistentStorageService) { }

  ngOnInit(): void {
  }

  // #region modal
  showModal: boolean = false;
  toggleModal = () => {
    this.showModal = !this.showModal;
  }
  // #endregion

// #region clear data confirmation
// not work yet #todo
  onClearData() {
    if (confirm('Are you sure to clear data?')) {
      this.pss.removeItemAsync('fav-subreddits');
      this.pss.removeItemAsync('fav-posts');
      window.location.reload();
    }
  }
// #endregion

}
